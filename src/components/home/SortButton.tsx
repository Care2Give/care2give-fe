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
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface Setters {
  setSortKey: Dispatch<SetStateAction<string>>;
  setSortIsIncreasing: Dispatch<SetStateAction<boolean>>;
}

export function DropdownMenuDemo({ setSortKey, setSortIsIncreasing }: Setters) {
  return (
    <div className="flex justify-start items-start w-full px-10 my-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-24 bg-[#f8e071] text-black text-sm font-light flex items-center gap-2">
            <span>Sort By</span>
            <ChevronDownIcon height={12} width={12} className="min-w-3" />
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
    </div>
  );
}
