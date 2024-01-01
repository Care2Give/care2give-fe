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
          <Button className="w-24 md:w-32 h-8 md:h-10 bg-[#f8e071] text-black text-sm md:text-lg font-light flex items-center gap-2">
            <span>Sort By</span>
            <ChevronDownIcon height={12} width={12} className="min-w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Text className="mr-2 h-4 w-4" />
                <span className="text-xs md:text-base">Campaign Title</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Button
                      onClick={() => {
                        setSortKey("Campaign Title");
                        setSortIsIncreasing(true);
                      }}
                      variant="ghost"
                      className="text-xs text-left p-0 justify-start h-6 md:text-base"
                    >
                      <ArrowUp className="mr-2 h-4 w-4" />
                      <span>A - Z</span>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      onClick={() => {
                        setSortKey("Campaign Title");
                        setSortIsIncreasing(false);
                      }}
                      variant="ghost"
                      className="text-xs text-left p-0 justify-start h-6 md:text-base"
                    >
                      <ArrowDown className="mr-2 h-4 w-4" />
                      <span>Z - A</span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Calendar className="mr-2 h-4 w-4" />
                <span className="text-xs md:text-base">End Date</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Button
                      onClick={() => {
                        setSortKey("End Date");
                        setSortIsIncreasing(false);
                      }}
                      variant="ghost"
                      className="text-xs text-left p-0 justify-start h-6 md:text-base"
                    >
                      <ArrowUp className="mr-2 h-4 w-4" />
                      <span>Latest First</span>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      onClick={() => {
                        setSortKey("End Date");
                        setSortIsIncreasing(true);
                      }}
                      variant="ghost"
                      className="text-xs text-left p-0 justify-start h-6 md:text-base"
                    >
                      <ArrowDown className="mr-2 h-4 w-4" />
                      <span>Earliest First</span>
                    </Button>
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
