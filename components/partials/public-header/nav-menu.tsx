import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { publicMenu } from "@/config/menus";

export default function NavMenu() {
  const [offset, setOffset] = React.useState<number | null>(null);
  const [list, setList] = React.useState<HTMLUListElement | null | undefined>();
  const [value, setValue] = React.useState<string | null>();

  const onNodeUpdate = (trigger: any, itemValue: any) => {
    if (trigger && list && value === itemValue) {
      const triggerOffsetLeft = trigger.offsetLeft + trigger.offsetWidth / 6;
      setOffset(Math.round(triggerOffsetLeft));
    } else if (value === "") {
      setOffset(null);
    }
    return trigger;
  };

  return (
    <div>
      <NavigationMenu.Root
        onValueChange={setValue}
        className="relative justify-start group z-[9999]"
      >
        <NavigationMenu.List
          ref={(node) => {
            if (node instanceof HTMLUListElement) {
              setList(node);
            } else {
              setList(null);
            }
          }}
          className="group flex list-none gap-4"
        >
          {publicMenu?.map((item: any, index: number) =>
            item.child ? (
              <NavigationMenu.Item key={`item-${index}`} value={item}>
                <NavigationMenu.Trigger
                  ref={(node) => onNodeUpdate(node, item)}
                  asChild
                  className="flex items-center"
                >
                  <div className="flex items-center px-2 py-2 cursor-pointer group data-[state=open]:text-primary">
                    <span className="text-base font-light text-white/50 hover:text-white duration-200">
                      {item.title}
                    </span>
                    <ChevronDown
                      className="relative top-[1px] text-white/50 ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </div>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  className={cn(
                    "w-full rounded-md border bg-popover text-popover-foreground shadow-lg"
                  )}
                >
                  {item.title === "Shop" ? (
                    <div className="flex flex-wrap min-w-[400px] p-2" key={`item-${index}`}>
                      {item.child?.map((childItem: any, index: number) => (
                        <div key={`mega-${index}`} className="w-1/2 mb-2">
                          <ListItem
                            className="text-base font-light text-black/50"
                            title={childItem.title}
                            href={childItem.href}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="min-w-[200px] p-4" key={`item-${index}`}>
                      {item.child?.map((childItem: any, index: number) => (
                        <ListItem
                          className="text-base font-medium text-white"
                          key={`child-${index}`}
                          title={childItem.title}
                          href={childItem.href}
                          target="_blank"
                        />
                      ))}
                    </div>
                  )}
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Item key={`item-${index}`}>
                <Link href={item.href}>
                  <div className="flex items-center px-2 py-2 cursor-pointer group data-[state=open]:text-primary">
                    <span className="text-base font-light text-white/60 hover:text-white duration-200">
                      {item.title}
                    </span>
                  </div>
                </Link>
              </NavigationMenu.Item>
            )
          )}
        </NavigationMenu.List>
        <div className="absolute top-full">
          <NavigationMenu.Viewport
            style={{
              display: !offset ? "none" : undefined,
              transform: `translateX(${offset}px)`,
              top: "100%",
              transition: "all 0.5s ease",
            }}
          />
        </div>
      </NavigationMenu.Root>
    </div>
  );
}

const ListItem = React.forwardRef<HTMLAnchorElement, any>(
  ({ className, children, title, ...props }, forwardedRef) => (
    <NavigationMenu.Link asChild>
      <Link
        className={cn(
          "select-none text-base font-medium text-default-600 rounded-md flex items-center gap-2 mb-4 last:mb-0 leading-none no-underline outline-none transition-colors hover:text-primary focus:text-primary",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <div>{children}</div>
        <div className="capitalize">{title}</div>
      </Link>
    </NavigationMenu.Link>
  )
);
