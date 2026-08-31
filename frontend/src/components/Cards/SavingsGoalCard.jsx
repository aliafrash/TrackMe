import React, { useState } from 'react';
import { ShieldCheckIcon, TrendingUpIcon } from '../Icons';
import { addThousandsSeparator } from '../../utils/helper';

const SavingsGoalCard = ({ currentSavings = 0 }) => {
  const [goalAmount, setGoalAmount] = useState(() => {
    const saved = localStorage.getItem('monthlySavingsGoal');
    return saved ? Number(saved) : 3000;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(goalAmount);

  const handleSaveGoal = (e) => {
    e.preventDefault();
    if (!tempGoal || isNaN(tempGoal) || Number(tempGoal) <= 0) return;
    const newGoal = Number(tempGoal);
    setGoalAmount(newGoal);
    localStorage.setItem('monthlySavingsGoal', newGoal);
    setIsEditing(false);
  };

  const progressPercentage = Math.min(
    Math.max(Math.round((currentSavings / goalAmount) * 100), 0),
    100
  );

  const isAchieved = currentSavings >= goalAmount;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-primary flex items-center justify-center">
            <ShieldCheckIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Savings Target Goal</h4>
            <p className="text-[11px] text-slate-400">Monthly financial milestone</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setTempGoal(goalAmount);
            setIsEditing(!isEditing);
          }}
          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          {isEditing ? 'Close' : 'Edit Goal'}
        </button>
      </div>

      {/* Edit Form */}
      {isEditing ? (
        <form onSubmit={handleSaveGoal} className="flex items-center gap-2 my-2">
          <input
            type="number"
            value={tempGoal}
            onChange={(e) => setTempGoal(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-primary"
            placeholder="Target Goal ($)"
          />
          <button
            type="submit"
            className="px-3 py-2 text-xs font-semibold bg-primary text-white rounded-xl shadow-xs hover:bg-violet-700 transition cursor-pointer shrink-0"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="my-2">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500">
              ${addThousandsSeparator(Math.max(currentSavings, 0))} saved
            </span>
            <span className="text-xs font-bold text-slate-800">
              Target: ${addThousandsSeparator(goalAmount)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isAchieved ? 'bg-emerald-500' : 'bg-gradient-to-r from-primary to-indigo-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer Status */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
        <span className="text-slate-500 font-medium">
          {progressPercentage}% Completed
        </span>
        <span
          className={`font-semibold px-2 py-0.5 rounded-md text-[11px] ${
            isAchieved
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-purple-50 text-primary'
          }`}
        >
          {isAchieved ? '🎉 Goal Achieved!' : '🎯 On Track'}
        </span>
      </div>
    </div>
  );
};

export default SavingsGoalCard;
