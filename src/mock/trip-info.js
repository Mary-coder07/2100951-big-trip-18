import { getTripInfo } from '../utils/trip-info.js';
import { CITIES, SUM_POINTS } from '../mock/consts.js';

export const generateTripInfo = (points) => {
  const tripInfo = getTripInfo(points);
  const mockTripInfo = {};
  if (tripInfo.pointsSequence.length > SUM_POINTS){
    mockTripInfo['tripTitle'] = `
    ${CITIES[tripInfo.pointsSequence[0].destination]} —...— 
    ${CITIES[tripInfo.pointsSequence[tripInfo.pointsSequence.length - 1].destination]}`;
  } else {
    const tripTitle = tripInfo.pointsSequence.map((point) => CITIES[point.destination]);
    mockTripInfo['tripTitle'] = tripTitle.join(' — ');
  }
  mockTripInfo['tripDateFrom'] = tripInfo.pointsSequence[0].dateFrom;
  mockTripInfo['tripDateTo'] = tripInfo.pointsSequence[tripInfo.pointsSequence.length - 1].dateTo;
  mockTripInfo['tripCost'] = tripInfo.tripCost;
  return mockTripInfo;
};
