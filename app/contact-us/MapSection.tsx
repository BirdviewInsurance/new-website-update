"use client";

export default function MapSection() {
  return (
    <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-xl">
      <iframe
        allowFullScreen
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.705416799195!2d36.78112685680388!3d-1.2605821231891767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17096b536781%3A0x3dda25d4e884798f!2sBirdview%20Microinsurance%20Limited!5e0!3m2!1sen!2ske!4v1747302441741!5m2!1sen!2ske"
        title="Birdview Microinsurance Location"
      />
    </div>
  );
}
