import { X } from 'lucide-react';
import React, { useState } from 'react'

const TimeSlotPopup = ({ addTimeSlot, setShowPopup, formData, setFormData}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="bg-black bg-opacity-70 absolute inset-0 flex justify-center">
      <form className="flex flex-col gap-5 bg-white w-[40vw] p-8 rounded-lg h-fit mt-8">
        <div className="flex justify-between">
          <p className="text-xl">Add lecture slots</p>
          <X onClick={() => setShowPopup(false)} className="cursor-pointer" />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="week_day" className="text-slate-800">
            Week Day
          </label>
          <select
            name="weekday"
            id="weekday"
            className="border border-gray-300 bg-white rounded-md px-4 py-3 w-full"
            value={formData.weekday}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Week day
            </option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="startTime" className="text-slate-800 flex-1 ">
              Start Time
            </label>
            <select
              name="startTime"
              id="startTime"
              className="border border-gray-300 bg-white rounded-md px-4 py-3 w-full"
              value={formData.startTime}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Week day
              </option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="endTime" className="text-slate-800">
              End Time
            </label>
            <input
              type="text"
              placeholder="e.g. Data analysis and algorithm"
              name="endTime"
              id="endTime"
              disabled
              value={formData.startTime ? parseFloat(formData.startTime) + 1 : 0}
              // onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-3 w-full"
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="program" className="text-slate-800">
              Program
            </label>
            <select
              name="program"
              id="program"
              value={formData.program}
              onChange={handleInputChange}
              className="border border-gray-300 bg-white rounded-md px-4 py-3 w-full"
            >
              <option value="" disabled>
                Select Program
              </option>
              <option value="BTech CS">BTech CS</option>
              <option value="BTech IT">BTech IT</option>
              <option value="BTech Mech">BTech Mech</option>
              <option value="BTech Chem">BTech Chem</option>
              <option value="BTech EXTC">BTech EXTC</option>
              <option value="BTech Prod">BTech Prod</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="year" className="text-slate-800">
              Year
            </label>
            <select
              name="year"
              id="year"
              value={formData.year}
              onChange={handleInputChange}
              className="border border-gray-300 bg-white rounded-md px-4 py-3 w-full"
            >
              <option value="disabled" disabled selected>
                Select year
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="course" className="text-slate-800">
            Course Name
          </label>
          <input
            type="text"
            placeholder="e.g. Data analysis and algorithm"
            name="course"
            id="course"
            required
            value={formData.course}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-3 w-full"
          />
        </div>

        <button
          onClick={addTimeSlot}
          className="bg-[#61BDF6] text-white p-4 py-3 rounded-md hover:opacity-90 flex gap-2 justify-center items-center"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TimeSlotPopup