import {useFetcher, useLocation} from '@remix-run/react';
import {useLiveMode} from '@sanity/react-loader';
import {VisualEditing as SanityVisualEditing} from '@sanity/visual-editing/remix';
import {cx} from 'class-variance-authority';

import {useIsInIframe} from '~/hooks/useIsInIframe';
import {useSanityClient} from '~/hooks/useSanityClient';

export function VisualEditing() {
  const isInIframe = useIsInIframe();
  const client = useSanityClient();
  // Enable live queries
  useLiveMode({client});

  return !isInIframe ? (
    <>
      <SanityVisualEditing />
      <ExitBanner />
    </>
  ) : (
    <SanityVisualEditing />
  );
}

function ExitBanner() {
  const fetcher = useFetcher({key: 'exit-sanity-preview'});
  const location = useLocation();

  return (
    <section className="bg-[--background] text-[--foreground] [--background:#16120C] [--foreground:#FFE7B3]">
      <div className="container py-6">
        <fetcher.Form action="/sanity/preview" method="POST">
          <input name="slug" type="hidden" value={location.pathname} />
          <div className="flex items-center justify-center gap-6">
            <small>Sanity Preview mode activated</small>
            <button
              className={cx(
                'flex h-[2.5rem] shrink-0 items-center justify-center rounded-full border border-[--foreground] p-4 text-sm font-bold duration-200 ease-out',
                'hover:bg-[--foreground] hover:text-[--background]',
                'disabled:bg-opacity-100 disabled:opacity-20',
              )}
              disabled={fetcher.state === 'submitting'}
              type="submit"
            >
              Exit Preview Mode
            </button>
          </div>
        </fetcher.Form>
      </div>
    </section>
  );
}
