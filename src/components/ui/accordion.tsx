import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  openItems: string[];
  toggle: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  value: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = "single", defaultValue, collapsible = true, children, ...props }, ref) => {
    const [openItems, setOpenItems] = React.useState<string[]>(() => {
      if (!defaultValue) return [];
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    });

    const toggle = React.useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          if (type === "single") {
            if (prev.includes(value) && collapsible) {
              return [];
            }
            return [value];
          }
          if (prev.includes(value)) {
            return prev.filter((v) => v !== value);
          }
          return [...prev, value];
        });
      },
      [type, collapsible]
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggle }}>
        <div ref={ref} className={cn("divide-y", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div ref={ref} data-accordion-item={value} className={cn("border-b", className)} {...props}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const accordionContext = React.useContext(AccordionContext);
    const itemContext = React.useContext(AccordionItemContext);
    
    if (!accordionContext) throw new Error("AccordionTrigger must be used within Accordion");
    if (!itemContext) throw new Error("AccordionTrigger must be used within AccordionItem");

    const { value } = itemContext;
    const isOpen = accordionContext.openItems.includes(value);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      accordionContext.toggle(value);
      onClick?.(e);
    };

    return (
      <h3 className="flex">
        <button
          ref={ref}
          type="button"
          onClick={handleClick}
          aria-expanded={isOpen}
          className={cn(
            "flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer w-full",
            className
          )}
          data-state={isOpen ? "open" : "closed"}
          {...props}
        >
          <span className="flex-1 pr-4">{children}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </h3>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const accordionContext = React.useContext(AccordionContext);
    const itemContext = React.useContext(AccordionItemContext);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<string>("0px");
    
    if (!accordionContext) throw new Error("AccordionContent must be used within Accordion");
    if (!itemContext) throw new Error("AccordionContent must be used within AccordionItem");

    const { value } = itemContext;
    const isOpen = accordionContext.openItems.includes(value);

    React.useEffect(() => {
      if (contentRef.current) {
        if (isOpen) {
          const scrollHeight = contentRef.current.scrollHeight;
          setHeight(`${scrollHeight}px`);
        } else {
          setHeight("0px");
        }
      }
    }, [isOpen, children]);

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden text-sm transition-[max-height,opacity] duration-300 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0",
          className
        )}
        style={{ maxHeight: height }}
        {...props}
      >
        <div ref={contentRef} className="pb-4 pt-0">
          {children}
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
