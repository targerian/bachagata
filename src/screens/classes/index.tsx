import React, { useState } from "react";
import {
  Button,
  Calendar,
  FilterChip,
  Input,
  Select,
} from "@/common/components";

type ClassType = "All" | "Bachata" | "Salsa" | "Chair";

export const ClassesScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ClassType>("All");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Booking logic will be added later
    console.log("Booking submitted");
  };

  const classOptions = [
    { value: "bachata-7pm", label: "Sensual Bachata Fundamentals - 7 PM" },
    { value: "salsa-8pm", label: "Salsa On1 Footwork - 8 PM" },
    { value: "chair-9pm", label: "Empowerment Chair Dance - 9 PM" },
  ];

  const filters: ClassType[] = ["All", "Bachata", "Salsa", "Chair"];

  return (
    <main className="flex flex-col gap-10 mt-10 md:mt-16 px-4 md:px-10 lg:px-30 max-w-[1200px] mx-auto">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-text-primary text-4xl md:text-5xl font-serif leading-tight tracking-[-0.033em]">
            Find Your Rhythm
          </p>
          <p className="text-text-secondary text-base font-normal leading-normal">
            Select a class from the calendar below to begin your booking.
          </p>
        </div>
      </div>

      {/* Main Content: Calendar and Booking Form */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-4">
        {/* Left Column: Calendar */}
        <div className="flex-1">
          {/* Filter Chips */}
          <div className="flex gap-3 p-3 flex-wrap pr-4 mb-4">
            {filters.map((filter) => (
              <FilterChip
                key={filter}
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterChip>
            ))}
          </div>

          {/* Calendar */}
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>

        {/* Right Column: Booking Form */}
        <div className="w-full lg:w-2/5 lg:max-w-md">
          <h2 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Reserve Your Spot
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
            <Select label="Class Selection" options={classOptions} required />

            <Input
              label="Full Name"
              placeholder="Enter your full name"
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              required
            />

            <div className="flex flex-col gap-2">
              <label className="text-text-secondary text-sm font-medium">
                Payment Information
              </label>
              <div className="flex items-center gap-3 rounded-lg border-2 border-white/20 bg-white/5 px-4 py-3">
                <svg
                  className="h-6 w-6 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <input
                  className="flex-1 bg-transparent text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-0 border-0 p-0"
                  placeholder="Card Number"
                  type="text"
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-4">
              Join the Dance
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};
