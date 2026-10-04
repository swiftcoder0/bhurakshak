"use client";

import React, { useState } from "react";
import { X, MapPin, UploadCloud, CheckCircle, AlertCircle } from "lucide-react";
import { LUCKNOW_PILOT } from "@/data/pilotData";

interface ReportObservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportObservationModal: React.FC<ReportObservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [observationType, setObservationType] = useState("vegetation_loss");
  const [locationName, setLocationName] = useState(
    "Lucknow Outer Ring Road, Uttar Pradesh"
  );
  const [coordinates, setCoordinates] = useState(
    LUCKNOW_PILOT.coordinates.formatted
  );
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Card */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-canvas-border bg-canvas-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-canvas-border/80 px-6 py-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-olive font-semibold">
              Ground Truth Verification
            </span>
            <h3 className="text-lg font-bold text-charcoal">
              Report a Ground Observation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-charcoal-muted hover:bg-canvas-border/50 hover:text-charcoal transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-olive-subtle text-olive">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-charcoal">
                Observation Recorded (Simulation)
              </h4>
              <p className="mt-1 text-xs text-charcoal-muted leading-relaxed max-w-md mx-auto">
                Thank you for logging ground evidence. In the active platform, this submission enters the validation candidate queue for cross-referencing against Copernicus Sentinel-2 acquisitions.
              </p>
            </div>
            <div className="rounded-lg border border-canvas-border bg-canvas p-3 font-mono text-xs text-charcoal-muted text-left">
              <div>Type: {observationType}</div>
              <div>Location: {locationName}</div>
              <div>Coordinates: {coordinates}</div>
              <div>Status: Under Review (Simulated)</div>
            </div>
            <button
              onClick={handleReset}
              className="rounded-full bg-walnut px-6 py-2.5 text-xs font-medium text-white hover:bg-walnut-hover transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Observation Type */}
            <div>
              <label className="block text-xs font-semibold text-charcoal">
                Observation Type
              </label>
              <select
                value={observationType}
                onChange={(e) => setObservationType(e.target.value)}
                className="mt-1 w-full rounded-md border border-canvas-border bg-canvas px-3 py-2 text-xs text-charcoal focus:border-walnut focus:outline-none"
              >
                <option value="vegetation_loss">Vegetation Canopy Loss / Clearing</option>
                <option value="built_up_expansion">New Construction / Built-up Expansion</option>
                <option value="water_body_change">Water-body Siltation / Shrinkage</option>
                <option value="agricultural_conversion">Arable Land Fallowing / Earthfilling</option>
                <option value="other">Other Environmental Change Event</option>
              </select>
            </div>

            {/* Location & Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal">
                  Location / Landmark
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-canvas-border bg-canvas px-3 py-2 text-xs text-charcoal focus:border-walnut focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal">
                  Coordinates (Lat, Lng)
                </label>
                <input
                  type="text"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                  className="mt-1 w-full rounded-md border border-canvas-border bg-canvas px-3 py-2 text-xs font-mono text-charcoal focus:border-walnut focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-charcoal">
                Observation Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-md border border-canvas-border bg-canvas px-3 py-2 text-xs text-charcoal focus:border-walnut focus:outline-none"
                required
              />
            </div>

            {/* Field Notes / Description */}
            <div>
              <label className="block text-xs font-semibold text-charcoal">
                Field Notes & Observed Evidence
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what was observed on the ground (e.g., active earthmoving machinery, newly laid boundary wall, tree felling)..."
                className="mt-1 w-full rounded-md border border-canvas-border bg-canvas px-3 py-2 text-xs text-charcoal placeholder:text-charcoal-faint focus:border-walnut focus:outline-none"
                required
              />
            </div>

            {/* Photo Upload Mock */}
            <div>
              <label className="block text-xs font-semibold text-charcoal">
                Field Photograph (Optional)
              </label>
              <div className="mt-1 flex flex-col items-center justify-center rounded-md border border-dashed border-canvas-border bg-canvas/40 px-4 py-4 text-center">
                <UploadCloud className="h-6 w-6 text-charcoal-muted" />
                <span className="mt-1 text-xs text-charcoal-muted">
                  Drag & drop geotagged image or browse
                </span>
                <span className="text-[10px] text-charcoal-faint">
                  EXIF geolocation coordinates will be auto-extracted
                </span>
              </div>
            </div>

            {/* Notice */}
            <div className="flex items-center gap-2 rounded bg-canvas-border/30 p-2.5 text-[11px] text-charcoal-muted">
              <AlertCircle className="h-4 w-4 text-olive shrink-0" />
              <span>
                Observations are cross-validated against Sentinel-2 spectral indices before inclusion in the public ledger.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-canvas-border bg-canvas px-4 py-2 text-xs font-medium text-charcoal hover:bg-canvas-border/40 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-walnut px-5 py-2 text-xs font-medium text-white hover:bg-walnut-hover transition-colors"
              >
                Submit Observation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
