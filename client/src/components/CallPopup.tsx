import { useState } from "react";
import { X, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { initiateCall } from "../services/vapi.service";
import { vapiFormContent } from "../data/content";

interface CallPopupProps {
  open: boolean;
  onClose: () => void;
}

type CallStatus = "form" | "calling" | "done" | "error";

export default function CallPopup({ open, onClose }: CallPopupProps) {
  const { user } = useAuth();
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState<CallStatus>("form");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone || !course || !topic) {
      toast.error("Please fill in all fields");
      return;
    }

    setStatus("calling");
    try {
      await initiateCall({ phone, course, topic });
      setStatus("done");
      toast.success("Call initiated!");
    } catch {
      setStatus("error");
      toast.error("Failed to initiate call.");
    }
  };

  const reset = () => {
    setStatus("form");
    setPhone("");
    setCourse("");
    setTopic("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 text-gray-400 transition-colors duration-200 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="rounded-t-2xl bg-maroon px-6 py-5">
          <h3 className="font-heading text-xl font-bold text-white">Talk to Our AI Counselor</h3>
          <p className="mt-1 text-sm text-white/70">
            Get personalized guidance on courses, admissions & more
          </p>
        </div>

        <div className="p-6">
          {status === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91-9876543210"
                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm transition-colors duration-200 focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Interested Course *
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors duration-200 focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon"
                >
                  <option value="">Select a course</option>
                  {vapiFormContent.courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  What do you want to know? *
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors duration-200 focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon"
                >
                  <option value="">Select a topic</option>
                  {vapiFormContent.topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-maroon py-3 font-semibold text-white transition-colors duration-200 hover:bg-maroon-dark"
              >
                Call Me Now
              </button>
            </form>
          )}

          {status === "calling" && (
            <div className="py-10 text-center">
              <Loader2 className="mx-auto mb-3 h-10 w-10 animate-spin text-maroon" />
              <h3 className="mb-1 font-heading text-lg font-bold text-gray-900">Calling you now...</h3>
              <p className="text-sm text-gray-500">Our AI counselor Ava is dialing {phone}</p>
            </div>
          )}

          {status === "done" && (
            <div className="py-10 text-center">
              <CheckCircle className="mx-auto mb-3 h-10 w-10 text-green-500" />
              <h3 className="mb-1 font-heading text-lg font-bold text-gray-900">Call Initiated!</h3>
              <p className="mb-4 text-sm text-gray-500">You'll receive a call shortly on {phone}.</p>
              <button onClick={reset} className="text-sm font-medium text-maroon hover:underline">
                Request Another Call
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="py-10 text-center">
              <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
              <h3 className="mb-1 font-heading text-lg font-bold text-gray-900">Call Failed</h3>
              <p className="mb-4 text-sm text-gray-500">Something went wrong. Please try again.</p>
              <button
                onClick={reset}
                className="rounded-lg bg-maroon px-5 py-2 text-sm text-white transition-colors duration-200 hover:bg-maroon-dark"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
