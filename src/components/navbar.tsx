import {} from "next/font/google";

export default function NavBar() {
  return (
    <nav className="w-full h-24 bg-[#5185FF] flex justify-between">
      <div>
        <img
          className="w-[66/1536px] h-[59/96px] pt-[18px] pl-16"
          src="./navbar/logo.svg"
        />
      </div>
      <div>
        <ul className="flex pt-8 pr-[1120px] gap-12 text-2xl font-normal">
          <li>
            <button>Home</button>
          </li>
          <li>
            <button>Campaigns</button>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex pt-8 pr-8 gap-[57px]">
          <li>
            <button>
              <img src="./navbar/gift_basket.svg"></img>
            </button>
          </li>
          <li>
            <button>
              <img src="./navbar/profile.svg"></img>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
