import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Preferences from './Preferences';
import { preferences, allowAllFilter, minYear, maxYear, ignoreAllBias } from '../../types/preferences';
import { SliderClicker } from '../../../test_utils/sliderClicker';

describe('Preferences', () => {
    const createInitialPreferences = (): preferences => {
        return {
            filters: {
                ...allowAllFilter
            },
            biases: { ...ignoreAllBias }
        };
    }

    const createExpectedPreferences = (initialPreferences: preferences): preferences => {
        let expectedPreferences: preferences = { ...initialPreferences };
        expectedPreferences.filters = { ...initialPreferences.filters };
        return expectedPreferences;
    }

    it('should change played games to false when played games is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.played = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('Played games'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should change unplayed games to false when unplayed games is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.unplayed = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('Unplayed games'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should change without critics score to false when games without critics score is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.withoutCriticsScore = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('No critics score'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should change with critics score to false when games with critics score is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.withCriticsScore = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('Critics score'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should minimum critics score to 25 when minimum score range slider is set to 25', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.criticsScore = [25, 100];
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        SliderClicker.change(screen.getByTestId('criticsScoreRange'), 25)

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should maximum critics score to 75 when maximum score range slider is set to 75', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.criticsScore = [0, 75];
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        SliderClicker.change(screen.getByTestId('criticsScoreRange'), 75)

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });




    it('should change without release date to false when games without release date is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.withoutReleaseDate = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('No release date'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should change with release date to false when games with release date is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.withReleaseDate = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('Release date'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it(`should set minimum release year to ${minYear + 5} when minimum release year range slider is set to ${minYear + 5}`, () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.releaseYear = [minYear + 5, initialPreferences.filters.releaseYear[1]];
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        SliderClicker.change(screen.getByTestId('releaseYearRange'), minYear + 5, minYear, maxYear)

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it(`should set maximum release year to ${maxYear - 5} when maximum release year range slider is set to ${maxYear - 5}`, () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.releaseYear = [initialPreferences.filters.releaseYear[0], maxYear - 5];
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        SliderClicker.change(screen.getByTestId('releaseYearRange'), maxYear - 5, minYear, maxYear)

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });
});
