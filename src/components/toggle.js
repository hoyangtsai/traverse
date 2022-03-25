
import clsx from 'clsx';
import * as styles from './toggle.module.css';

import React, { useState, useRef, memo } from 'react';

// Copyright 2015-present Drifty Co.
// http://drifty.com/
// from: https://github.com/driftyco/ionic/blob/master/src/util/dom.ts
function pointerCoord(event) {
  // get coordinates for either a mouse click
  // or a touch depending on the given event
  if (event) {
    const changedTouches = event.changedTouches;
    if (changedTouches && changedTouches.length > 0) {
      const touch = changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    const pageX = event.pageX;
    if (pageX !== undefined) {
      return { x: pageX, y: event.pageY };
    }
  }
  return { x: 0, y: 0 };
}

const ToggleComponent = memo((props) => {
  const {
    className,
    switchConfig,
    onChange,
    disabled
  } = props;

  const { darkIcon, darkIconStyle, lightIcon, lightIconStyle } = switchConfig;
  const [checked, setChecked] = useState(!!(props.checked || props.defaultChecked));
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  let previouslyChecked = !!(props.checked || props.defaultChecked);
  let startX, touchStarted, touchMoved, hadFocusAtTouchStart;
  const classes = clsx(styles.toggle, className, {
    [styles.toggleChecked]: checked,
    [styles.toggleFocused]: focused,
    [styles.toggleDisabled]: disabled,
  });

  function handleClick(event) {
    const checkbox = inputRef.current;
    previouslyChecked = checkbox.checked;
    if (event.target !== checkbox && !touchMoved) {
      event.preventDefault();
      checkbox.focus();
      checkbox.click();
      return;
    }
    setChecked(checkbox.checked)
  }

  function handleTouchStart(event) {
    startX = pointerCoord(event).x;
    touchStarted = true;
    hadFocusAtTouchStart = focused;
    setFocused(true);
  }

  function handleTouchMove(event) {
    if (!touchStarted) return;
    touchMoved = true;

    if (startX != null) {
      let currentX = pointerCoord(event).x;
      if (checked && currentX + 15 < startX) {
        setChecked(false);
        startX = currentX;
      } else if (!checked && currentX - 15 > startX) {
        setChecked(true);
        startX = currentX;
      }
    }
  }

  function handleTouchEnd(event) {
    if (!touchMoved) return;
    const checkbox = inputRef.current;
    event.preventDefault();

    if (startX != null) {
      if (previouslyChecked !== checked) {
        checkbox.click();
      }
      touchStarted = false;
      startX = null;
      touchMoved = false;
    }

    if (!hadFocusAtTouchStart) {
      setFocused(false);
    }
  }

  function handleTouchCancel(event) {
    if (startX != null) {
      touchStarted = false;
      startX = null;
      touchMoved = false;
    }

    if (!hadFocusAtTouchStart) {
      setFocused(false);
    }
  }

  return (
    <div
      className={classes}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <div className={styles.toggleTrack}>
        <div className={styles.toggleTrackCheck}>
          <span className={styles.toggleIcon} style={darkIconStyle}>
            {darkIcon}
          </span>
        </div>
        <div className={styles.toggleTrackX}>
          <span className={styles.toggleIcon} style={lightIconStyle}>
            {lightIcon}
          </span>
        </div>
        <div className={styles.toggleTrackThumb} />
      </div>

      <input
        ref={inputRef}
        className={styles.toggleScreenReader}
        type="checkbox"
        checked={checked}
        aria-label="Switch between Dark and Light mode"
        onChange={onChange}
        onClick={() => setChecked(!checked)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            inputRef.current?.click();
          }
        }}
      />
    </div>
  )
})

export default ToggleComponent;


// export default function Toggle(props: Props): JSX.Element {
//   const {
//     colorMode: { switchConfig },
//   } = useThemeConfig();
//   const isBrowser = useIsBrowser();

//   return (
//     <ToggleComponent
//       switchConfig={switchConfig}
//       disabled={!isBrowser}
//       {...props}
//     />
//   );
// }