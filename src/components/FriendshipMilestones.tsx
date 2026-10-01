import React from 'react';
import { Heart, Sparkles, Coffee, Compass, Smile } from 'lucide-react';

interface Milestone {
  icon: React.ReactNode;
  tag: string;
  title: string;
  desc: string;
}

const MILESTONES: Milestone[] = [
  {
    icon: <Sparkles className="w-5 h-5 text-pink-500" />,
    tag: 'Chapter 01',
    title: 'The Best Beginning 🌸',
    desc: 'The unexpected day we started talking. Who knew a simple conversation would turn into the most treasured bond.',
  },
  {
    icon: <Coffee className="w-5 h-5 text-rose-500" />,
    tag: 'Chapter 02',
    title: 'Late Night Chats & Endless Laughs ☕',
    desc: 'Hours flying by like minutes, sharing crazy thoughts, inside jokes that make zero sense to anyone else, and laughing till our stomachs hurt.',
  },
  {
    icon: <Compass className="w-5 h-5 text-amber-500" />,
    tag: 'Chapter 03',
    title: 'Through Every Up & Down 💫',
    desc: 'On good days and tough days, having someone who genuinely listens without judgment is the greatest blessing.',
  },
  {
    icon: <Smile className="w-5 h-5 text-pink-600" />,
    tag: 'Chapter 04',
    title: '02 October — Celebrating You! 🎂',
    desc: 'Today is a reminder of how lucky the world is to have you. Forever grateful for you, Sadaf!',
  },
];

export const FriendshipMilestones: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            <span>Our Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#831843] mb-3">
            Bestie Memories & Chapters 🎀
          </h2>
          <p className="text-sm sm:text-base text-pink-900/70 font-normal">
            Every little milestone that makes this friendship so special.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MILESTONES.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-pink-200/90 shadow-lg shadow-pink-500/5 hover:shadow-xl hover:shadow-pink-500/15 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-pink-500">
                    {item.tag}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center border border-pink-100">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#831843] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-pink-950/75 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-pink-100/70 flex items-center justify-between text-xs text-pink-400">
                <span>Bond Forever</span>
                <span>💗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
