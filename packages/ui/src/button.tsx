"use client";

import * as React from "react";

export function Button({
  className = "",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={`rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}
