import { ArrowUp, ArrowDown, Text, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dispatch, SetStateAction } from "react";

interface Setters {
  // toggleSorted: () => void;
  setSortKey: Dispatch<SetStateAction<string>>;
  setSortIsIncreasing: Dispatch<SetStateAction<boolean>>;
}

export function DropdownMenuDemo({
  // toggleSorted,
  setSortKey,
  setSortIsIncreasing,
}: Setters) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-24 mb-4 bg-[#f8e071] text-black">
          Sort By
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Text className="mr-2 h-4 w-4" />
              <span>Campaign Title</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <ArrowUp className="mr-2 h-4 w-4" />
                  <button
                    onClick={() => {
                      // toggleSorted();
                      setSortKey("Campaign Title");
                      setSortIsIncreasing(true);
                    }}
                  >
                    A - Z
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowDown className="mr-2 h-4 w-4" />
                  <button
                    onClick={() => {
                      // toggleSorted();
                      setSortKey("Campaign Title");
                      setSortIsIncreasing(false);
                    }}
                  >
                    Z - A
                  </button>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Calendar className="mr-2 h-4 w-4" />
              <span>End Date</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <ArrowUp className="mr-2 h-4 w-4" />
                  <button
                    onClick={() => {
                      // toggleSorted();
                      setSortKey("End Date");
                      setSortIsIncreasing(false);
                    }}
                  >
                    Latest First
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowDown className="mr-2 h-4 w-4" />
                  <button
                    onClick={() => {
                      // toggleSorted();
                      setSortKey("End Date");
                      setSortIsIncreasing(true);
                    }}
                  >
                    Earliest First
                  </button>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
