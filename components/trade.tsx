import Image from "next/image";
import Link from "next/link";

interface DataTypes {
  name: string;
  avatar: string;
  bought: string;
  boughtUsd: string;
  memecoin: string;
  timeAgo: string;
  action: "Bought" | "Sold";
}

interface TradeBoxProps {
  title: string;
  coin: string;
  memeIcon: string;
  icon: string;
  data: DataTypes[];
}

const TradeBox = ({ title, coin, icon, data, memeIcon }: TradeBoxProps) => {
  return (
    <div className="border border-white/10 rounded-[12px] py-[17px] md:px-[12px] px-[10px] bg-black/40 w-full">
      <div className="text-white/80 font-light w-full text-[11px] lg:text-[14px] flex justify-between items-center pb-[17px] border-b border-white/10">
        <h4 className="flex items-center text-[14px] lg:text-[16px]  lg:gap-2 gap-1 w-full  justify-between">
          {title}
          <div className="flex items-cente  text-[11px] lg:text-[14px] gap-1">
            {" "}
            <Image
              src={icon || "/placeholder.svg"}
              alt={coin}
              width={20}
              height={20}
              className="mr-1 lg:w-auto rounded-full w-[16px] h-[16px] lg:h-auto "
            />
            <span>{coin}</span>
          </div>
        </h4>
      </div>
      <div className="text-[11px] lg:text-[14px]">
        {data.map((item, index) => (
          <div
            className="flex w-full  justify-between items-center py-[10px]"
            key={index}
          >
            <div className="flex w-full justify-between items-center gap-[6px] text-white/80 font-light ">
              <Image
                src={item.avatar || "/placeholder.svg"}
                alt={item.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-white/80 font-light">{item.name}</span>
              <span
                className={
                  item.action === "Bought" ? "text-green-500" : "text-red-500"
                }
              >
                {item.action}
              </span>
              <span className="text-green-500">{item.bought}</span>
              <span className="text-white/80">Of</span>
              <div className="flex items-center gap-1">
                <Image
                  src={memeIcon || "/placeholder.svg"}
                  alt={item.memecoin}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
                <span className="text-white/80">{item.memecoin}</span>
              </div>
              <span className="text-white/80">at</span>
              <span className="text-yellow-500">{item.boughtUsd}</span>
              <span className="text-white/80">{item.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function Trade() {
  const bnbData = [
    {
      name: "Robo",
      avatar: "/eth.svg",
      action: "Bought",
      bought: "3.51 BNB",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Robo",
      avatar: "/eth.svg",
      action: "Sold",
      bought: "3.51 BNB",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Robo",
      avatar: "/eth.svg",
      action: "Bought",
      bought: "3.51 BNB",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Robo",
      avatar: "/eth.svg",
      action: "Sold",
      bought: "3.51 BNB",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Robo",
      avatar: "/eth.svg",
      action: "Sold",
      bought: "3.51 BNB",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Robo",
      avatar: "/eth.svg",
      action: "Sold",
      bought: "3.51 BNB",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Robo",
      avatar: "/eth.svg",
      action: "Bought",
      bought: "3.51 BNB",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
  ];

  const ethData = [
    {
      name: "Mobo",
      avatar: "/eth.svg",
      action: "Bought",
      bought: "3.51 ETH",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Mobo",
      avatar: "/eth.svg",
      action: "Sold",
      bought: "3.51 ETH",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Mobo",
      avatar: "/eth.svg",
      action: "Bought",
      bought: "3.51 ETH",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Mobo",
      avatar: "/eth.svg",
      action: "Sold",
      bought: "3.51 ETH",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Mobo",
      avatar: "/eth.svg",
      action: "Sold",
      bought: "3.51 ETH",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Mobo",
      avatar: "/eth.svg",
      action: "Sold",
      bought: "3.51 ETH",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
    {
      name: "Mobo",
      avatar: "/eth.svg",
      action: "Bought",
      bought: "3.51 ETH",
      boughtUsd: "$0.0234",
      memecoin: "PONKE",
      timeAgo: "35s ago",
    },
  ];

  return (
    <div className="w-full mt-[52px]">
      <div className="flex justify-between items-center w-full md:text-[20px] text-[18px]   text-white font-light">
        <h4 className="flex items-center justify-between gap-2">
          <div className="w-[11px] aspect-square bg-[#11FF00] rounded-full animate-pulse" />
          Live Transaction
        </h4>
        <Link href="/trades">
          <button className="flex items-center gap-2 text-[9.2px] font-aktiv-regular font-normal lg:textex-[20px]">
            View Trades
            <Image
              src="/arr-right.svg"
              alt="arrow"
              width={40}
              height={20}
              className="rounded-full w-[17px] lg:w-auto"
              // className="w-[40px] h-[20px] rounded-full"
            />
          </button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full bg-black ">
        <TradeBox
          title="Recent trades"
          coin="BNB"
          icon="/bnb.svg"
          memeIcon="/ponki.svg"
          data={bnbData as DataTypes[]}
        />
        <TradeBox
          title="Recent trades"
          coin="ETH"
          icon="/eth.svg"
          memeIcon="/eth.svg"
          data={ethData as DataTypes[]}
        />

        <TradeBox
          title="Recent trades"
          coin="ETH"
          icon="/eth.svg"
          memeIcon="/eth.svg"
          data={ethData as DataTypes[]}
        />
      </div>
    </div>
  );
}

export default Trade;
