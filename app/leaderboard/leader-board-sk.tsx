export default function LeaderboardRowSkeleton() {
  return (
    <div className="flex items-center flex-wrap gap-3.5 justify-between p-3 border border-[#1F1F1F] text-white/80 rounded-[13px] bg-black animate-pulse">
      <div className="flex items-center gap-3">
        {/* Rank placeholder */}
        <div className="w-6 h-6 bg-[#2A2A2A] rounded-full"></div>

        <div className="flex items-center gap-2">
          {/* Avatar placeholder */}
          <div className="w-[20px] h-[20px] bg-[#2A2A2A] rounded-full"></div>
          {/* Name placeholder */}
          <div className="h-[16px] w-[80px] bg-[#2A2A2A] rounded-md"></div>
          {/* Social icons placeholders */}
          <div className="w-[14px] h-[14px] bg-[#2A2A2A] rounded-full"></div>
          <div className="w-[16px] h-[16px] bg-[#2A2A2A] rounded-full"></div>

          {/* Wallet address placeholder */}
          <div className="h-[16px] w-[120px] bg-[#2A2A2A] rounded-md lg:ml-[40px]"></div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Win/Loss placeholder */}
        <div className="h-[16px] w-[60px] bg-[#2A2A2A] rounded-md"></div>
        {/* Profit placeholder */}
        <div className="h-[16px] w-[70px] bg-[#2A2A2A] rounded-md"></div>
        {/* USD value placeholder */}
        <div className="flex items-center gap-1">
          <div className="w-[21px] h-[22px] bg-[#2A2A2A] rounded-md"></div>
          <div className="h-[16px] w-[60px] bg-[#2A2A2A] rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
