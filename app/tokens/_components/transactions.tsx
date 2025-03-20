interface TokenTransactionProps {
  trader: string;
  bought: string;
  got: string;
  time: string;
}

export default function TokenTransaction({
  trader,
  bought,
  got,
  time,
}: TokenTransactionProps) {
  return (
    <div className="grid grid-cols-4 text-xs p-2">
      <div className="flex items-center gap-1">
        <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-[10px]">
          D
        </div>
        <span>{trader}</span>
      </div>
      <div className="text-yellow-500">{bought}</div>
      <div className="text-yellow-500">{got}</div>
      <div className="text-gray-400">{time}</div>
    </div>
  );
}
