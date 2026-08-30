import React, { useState } from 'react';

const DEFAULT_EMOJIS = [
  '💼', '💰', '💵', '💳', '🏦', '📈', '🏠', '🍔', '🍕', '☕',
  '🛒', '🚗', '⛽', '✈️', '🎮', '🎬', '🎁', '🏥', '💊', '📱',
  '💻', '🎓', '🏋️', '⚡', '💡', '🛠️', '👗', '🍼', '🐾', '🧾'
];

const EmojiSelector = ({ selectedEmoji, onSelectEmoji }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 relative">
      <label className="text-[13px] font-medium text-slate-800">
        Icon / Category Emoji
      </label>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-purple-100 text-2xl flex items-center justify-center border border-slate-200 hover:border-primary transition cursor-pointer"
          title="Choose Icon"
        >
          {selectedEmoji || '💰'}
        </button>
        <span className="text-xs text-slate-400">
          Click icon to pick a custom emoji
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 z-50 bg-white border border-slate-200 rounded-2xl p-3 shadow-xl w-72 max-h-48 overflow-y-auto">
          <div className="grid grid-cols-6 gap-2">
            {DEFAULT_EMOJIS.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onSelectEmoji(emoji);
                  setIsOpen(false);
                }}
                className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center hover:bg-purple-100 transition cursor-pointer ${
                  selectedEmoji === emoji ? 'bg-purple-100 border border-primary' : ''
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiSelector;
