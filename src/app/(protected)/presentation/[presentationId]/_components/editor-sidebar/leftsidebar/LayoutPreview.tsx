import { Skeleton } from "@/components/ui/skeleton";
import { useSlideStore } from "@/store/useSlideStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useEffect, useState } from "react";

type Props = {};

const LayoutPreview = (props: Props) => {
  const { getOrderedSlides, reorderSlides } = useSlideStore();
  const [loading, setLoading] = useState(true);

  const slides = getOrderedSlides();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  return (
    <div className="w-64 h-full fixed left-0 top-20 border-r overflow-y-auto">
      <ScrollArea suppressHydrationWarning className="h-full w-full">
        {loading ? (
          <div className="w-full px-4 flex flex-col space-y-5">
            <Skeleton className="h-20 w-full bg-slate-100`" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <div className="p-4 pb-32 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="dark:text-gray-100 text-gray-500">SLIDES</h2>
              <span
                suppressHydrationWarning
                className="dark:text-gray-200 text-gray-500"
              >
                {slides?.length} Slides
              </span>
            </div>
            {/* Implement Draggable Slide Feature  */}
            {/* {slides?.map((slide, i) => (
              <DraggableSlidePreview
                key={slide.id || i}
                slide={slide}
                index={i}
                moveSlide={moveSlide}
              />
            ))} */}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LayoutPreview;
