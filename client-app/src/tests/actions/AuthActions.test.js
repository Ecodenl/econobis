import { authSuccess } from '../../actions/general/AuthActions';

test('should set auth to success', () => {
    const action = authSuccess();

    expect(action).toEqual({
        type: 'AUTH_USER',
    });
});