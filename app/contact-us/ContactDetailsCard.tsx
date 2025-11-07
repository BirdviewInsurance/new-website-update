"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import {
  PhoneIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

export default function ContactDetailsCard() {
  const handleClickWhatsapp = () => {
    window.open("https://wa.me/254742222888", "_blank");
  };

  const contactDetails = [
    {
      icon: <PhoneIcon className="w-5 h-5" />,
      label: "+254 742 222 888",
      href: "tel:+254742222888",
    },
    {
      icon: <PhoneIcon className="w-5 h-5" />,
      label: "+254 111 056 610",
      href: "tel:+254111056610",
    },
    {
      icon: <ChatBubbleLeftIcon className="w-5 h-5" />,
      label: "Chat on WhatsApp",
      onClick: handleClickWhatsapp,
    },
    {
      icon: <EnvelopeIcon className="w-5 h-5" />,
      label: "customerservice@birdviewinsurance.com",
      href: "mailto:customerservice@birdviewinsurance.com",
    },
    {
      icon: <BuildingLibraryIcon className="w-5 h-5" />,
      label:
        "Ground Floor, Fidelity Center, Waiyaki Way, Westlands, Nairobi, Kenya",
      href: "https://www.google.com/maps?q=Fidelity+Center,+Waiyaki+Way,+Westlands,+Nairobi,+Kenya",
      target: "_blank",
    },
  ];

  return (
    <div className="relative group" id="support">
      <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-primary/70 to-danger/70 opacity-60 blur-lg group-hover:opacity-90 transition duration-500" />
      <Card className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <h2 className="text-xl font-bold text-primary mb-4">
            Our Contact Details
          </h2>
        </CardHeader>
        <CardBody className="flex flex-col space-y-4">
          {contactDetails.map((item, idx) => (
            <a
              key={idx}
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition"
              href={item.href || "#"}
              target={item.target}
              onClick={item.onClick}
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-gray-100 text-sm md:text-base break-words">
                {item.label}
              </span>
            </a>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
