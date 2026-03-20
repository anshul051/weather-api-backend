export const metrics = {
  cacheHits: 0,
  cacheMisses: 0,
  totalRequests: 0
};

export const getMetrics = () => {
  const hitRate = metrics.totalRequests > 0 
    ? (metrics.cacheHits / metrics.totalRequests * 100).toFixed(1)
    : 0;
  
  return {
    cacheHits: metrics.cacheHits,
    cacheMisses: metrics.cacheMisses,
    totalRequests: metrics.totalRequests,
    hitRate: `${hitRate}%`
  };
};

export const resetMetrics = () => {
  metrics.cacheHits = 0;
  metrics.cacheMisses = 0;
  metrics.totalRequests = 0;
};