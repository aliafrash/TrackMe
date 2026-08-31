import React from 'react';
import { TrashIcon } from '../Icons';
import { addThousandsSeparator, CURRENCY } from '../../utils/helper';

const TransactionCard = ({
  id,
  title,
  amount,
  date,
  icon,
  type = 'income',
  onDelete,
  hideDelete = false,
}) => {
  const isIncome = type === 'income';

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-200/80 rounded-2xl hover:border-slate-300 hover:shadow-xs transition duration-200 group">
      {/* Left: Icon & Details */}
      <div className="flex items-center gap-3.5">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
            isIncome
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              : 'bg-rose-50 text-rose-500 border border-rose-100'
          }`}
        >
          {icon || (isIncome ? '💰' : '💳')}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-800 tracking-tight">
            {title}
          </span>
          <span className="text-xs text-slate-400 mt-0.5">{formattedDate}</span>
        </div>
      </div>

      {/* Right: Amount & Delete Action */}
      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-bold tracking-tight ${
            isIncome ? 'text-emerald-600' : 'text-rose-500'
          }`}
        >
          {isIncome ? '+' : '-'}{CURRENCY} {addThousandsSeparator(amount)}
        </span>

        {!hideDelete && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
            title="Delete Transaction"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
