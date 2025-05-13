"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { seedDatabase } from "@/actions/seed-database";

export default function SeedPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const result = await seedDatabase();
      setResult(result);
    } catch (error) {
      setResult({ success: false, error: "An error occurred" });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Database Seeder</h1>
      <p className="mb-4">
        This page allows you to seed the database with sample data for testing the public transport tracking system.
      </p>
      <div className="flex flex-col gap-4 max-w-md">
        <Button 
          onClick={handleSeed} 
          disabled={isSeeding}
          className="w-full"
        >
          {isSeeding ? "Seeding..." : "Seed Database"}
        </Button>

        {result && (
          <div className={`p-4 rounded-md ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {result.success ? (
              <p>{result.message}</p>
            ) : (
              <p>Error: {result.error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
