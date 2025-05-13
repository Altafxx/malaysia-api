"use client";

import { Batch } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BatchSelectorProps {
  batches: Batch[];
  onBatchChange: (batchId: string) => void;
  currentBatchId?: string | null;
}

export default function BatchSelector({
  batches,
  onBatchChange,
  currentBatchId,
}: BatchSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set initial index based on currentBatchId
  useEffect(() => {
    if (currentBatchId && batches.length > 0) {
      const index = batches.findIndex((batch) => batch.id === currentBatchId);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [batches, currentBatchId]);

  // Handle navigation
  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onBatchChange(batches[newIndex].id);
    }
  };

  const goToNext = () => {
    if (currentIndex < batches.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onBatchChange(batches[newIndex].id);
    }
  };

  if (!batches || batches.length === 0) {
    return <div>No batches available</div>;
  }

  const currentBatch = batches[currentIndex];
  const formattedDate = new Date(currentBatch.createdAt).toLocaleString();

  return (
    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
      <Button
        variant="outline"
        size="icon"
        onClick={goToPrevious}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="text-center">
        <div className="font-medium">Batch {currentIndex + 1} of {batches.length}</div>
        <div className="text-sm text-muted-foreground">{formattedDate}</div>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={goToNext}
        disabled={currentIndex === batches.length - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
