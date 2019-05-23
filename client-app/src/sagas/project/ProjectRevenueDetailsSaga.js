import { put, call } from 'redux-saga/effects';
import ProjectRevenueAPI from '../../api/project/ProjectRevenueAPI';

export function* fetchProjectRevenueSaga({ id }) {
    try {
        const projectRevenue = yield call(ProjectRevenueAPI.fetchProjectRevenue, id);

        yield put({ type: 'FETCH_PROJECT_REVENUE_SUCCESS', projectRevenue });
    } catch (error) {
        yield put({ type: 'FETCH_PROJECT_REVENUE_ERROR', error });
    }
}

export function* fetchProjectRevenueParticipantsSaga(data) {
    try {
        document.body.style.cursor = 'wait';
        const projectRevenueParticipants = yield call(
            ProjectRevenueAPI.fetchProjectRevenueParticipants,
            data.data.id,
            data.data.page
        );
        document.body.style.cursor = 'default';
        yield put({
            type: 'PROJECT_REVENUE_GET_PARTICIPANTS_SUCCESS',
            projectRevenueParticipants,
        });
    } catch (error) {
        document.body.style.cursor = 'default';
        yield put({ type: 'PROJECT_REVENUE_GET_PARTICIPANTS_ERROR', error });
    }
}

export function* fetchProjectRevenueDistributionSaga(data) {
    try {
        document.body.style.cursor = 'wait';
        const projectRevenueDistribution = yield call(
            ProjectRevenueAPI.fetchProjectRevenueDistribution,
            data.data.id,
            data.data.page
        );
        document.body.style.cursor = 'default';
        yield put({
            type: 'PROJECT_REVENUE_GET_DISTRIBUTION_SUCCESS',
            projectRevenueDistribution,
        });
    } catch (error) {
        document.body.style.cursor = 'default';
        yield put({ type: 'PROJECT_REVENUE_GET_DISTRIBUTION_ERROR', error });
    }
}
