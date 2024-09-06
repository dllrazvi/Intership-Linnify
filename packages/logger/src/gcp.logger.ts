import { LoggingWinston } from '@google-cloud/logging-winston';
import {
  CloudTraceContext,
  HeaderWrapper,
  X_CLOUD_TRACE_HEADER,
  getContextFromTraceParent,
  getContextFromXCloudTrace
} from '@google-cloud/logging/build/src/utils/context';
import { randomBytes, randomFillSync } from 'crypto';
import * as uuid from 'uuid';

const SPAN_ID_RANDOM_BYTES = 8;
const spanIdBuffer = Buffer.alloc(SPAN_ID_RANDOM_BYTES);

const spanRandomBuffer = randomFillSync
  ? () => randomFillSync(spanIdBuffer)
  : () => randomBytes(SPAN_ID_RANDOM_BYTES);

function makeCloudTraceHeader() {
  const trace = uuid.v4().replace(/-/g, '');
  const spanId = spanRandomBuffer().toString('hex');
  return `${trace}/${spanId}`;
}

/**
 * GoogleCloudLogging does not parse correctly the request header, so we cannot use the getOrInjectContext method
 * Replace the getOrInjectContext with our own implementation
 *
 */
export const getTraceContextNextRequest = (
  req: {
    headers: {
      get: (value: string) => string | undefined;
      set: (name: string, value: string) => void;
    };
  },
  projectId: string
): CloudTraceContext => {
  const wrapper: HeaderWrapper = {
    setHeader: (name: string, value: string) => req.headers.set(name, value),
    getHeader: (name: string) => req.headers.get(name) ?? undefined
  };

  // Detect 'traceparent' header.
  const traceContext = getContextFromTraceParent(wrapper, projectId);
  if (traceContext) {
    return traceContext;
  }

  // Detect 'X-Cloud-Trace-Context' header.
  const cloudContext = getContextFromXCloudTrace(wrapper, projectId);
  if (cloudContext) {
    return cloudContext;
  }

  // Optional: Generate and inject a context for the user as last resort.
  wrapper.setHeader(X_CLOUD_TRACE_HEADER, makeCloudTraceHeader());
  return getContextFromXCloudTrace(wrapper, projectId) as CloudTraceContext;
};
