'use client';

import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <PageShell
      label="ERROR"
      title="Something went wrong."
      description="An unexpected error occurred. Try reloading the page."
      actions={
        <Button variant="secondary" onClick={reset}>
          TRY AGAIN
        </Button>
      }
    />
  );
}
