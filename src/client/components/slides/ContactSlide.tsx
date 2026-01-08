/**
 * ContactSlide - Contact information layout with icon styling
 * Military-tech aesthetic: clean info layout with lime accent icons
 */

import type { ContactSlide as ContactSlideType } from "../../../shared/types/presentation.ts";

export interface ContactSlideProps {
  slide: ContactSlideType;
}

/** Icon component for contact items */
function ContactIcon({
  type,
}: {
  type: "email" | "website" | "social" | "phone" | "location" | "other";
}): React.ReactElement {
  const iconClass = "w-5 h-5 text-lime-500";

  switch (type) {
    case "email":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "website":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case "social":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case "phone":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    case "location":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

export function ContactSlide({
  slide,
}: ContactSlideProps): React.ReactElement {
  // Handle empty contacts
  if (slide.contacts.length === 0) {
    return (
      <div className="flex flex-col items-start">
        {slide.title && (
          <h1 className="text-h1 font-bold mb-6 text-sand-100">{slide.title}</h1>
        )}
        <div
          className="w-48 h-32 rounded-slide bg-dot-pattern opacity-30"
          style={{ backgroundSize: "16px 16px" }}
        />
        <p className="text-sand-500 mt-4">No contact info</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start max-w-3xl w-full">
      {/* Title */}
      {slide.title && (
        <div className="mb-10">
          <h1 className="text-h1 font-bold text-sand-100 mb-4">{slide.title}</h1>
          {/* Decorative accent */}
          <div className="w-16 h-1 bg-lime-500 rounded-full shadow-lime-glow" />
        </div>
      )}

      {/* Name */}
      {slide.name && (
        <h2 className="text-h2 font-semibold text-sand-100 mb-2">{slide.name}</h2>
      )}

      {/* Role/Position */}
      {slide.role && (
        <p className="text-h3 text-lime-600 mb-8 font-normal">{slide.role}</p>
      )}

      {/* Contact items grid */}
      <div className="w-full space-y-4">
        {slide.contacts.map((contact, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-olive-800/30 border border-olive-600 rounded-slide px-6 py-4 transition-all duration-200 hover:border-lime-600/50 group backdrop-blur-sm"
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-olive-700/50 flex items-center justify-center group-hover:bg-olive-600/50 transition-colors">
              <ContactIcon type={contact.type} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {contact.label && (
                <div className="text-caption text-sand-500 uppercase tracking-wider mb-0.5">
                  {contact.label}
                </div>
              )}
              <div className="text-body text-sand-100 truncate">
                {contact.value}
              </div>
            </div>

            {/* Arrow indicator */}
            <svg
              className="w-5 h-5 text-olive-500 group-hover:text-lime-600 transition-colors flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
