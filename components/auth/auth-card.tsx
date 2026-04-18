import { Card } from "@/components/ui/card";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl border bg-white">
      {children}
    </Card>
  );
}