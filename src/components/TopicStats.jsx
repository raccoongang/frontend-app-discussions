/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Icon, OverlayTrigger, Tooltip } from '@edx/paragon';
import { HelpOutline, PostOutline, Report } from '@edx/paragon/icons';

import {
  selectUserHasModerationPrivileges,
  selectUserIsGroupTa,
} from '../discussions/data/selectors';
import messages from '../discussions/in-context-topics/messages';

function TopicStats({
  threadCounts,
  activeFlags,
  inactiveFlags,
  intl,
}) {
  const userHasModerationPrivileges = useSelector(selectUserHasModerationPrivileges);
  const userIsGroupTa = useSelector(selectUserIsGroupTa);
  const canSeeReportedStats = (activeFlags || inactiveFlags) && (userHasModerationPrivileges || userIsGroupTa);
  return (
    <div className="d-flex align-items-center mt-2.5" style={{ marginBottom: '2px' }}>
      <OverlayTrigger
        overlay={(
          <Tooltip>
            <div className="d-flex flex-column align-items-start">
              {intl.formatMessage(messages.discussions, {
                count: threadCounts?.discussion || 0,
              })}
            </div>
          </Tooltip>
        )}
      >
        <div className="d-flex align-items-center mr-3.5">
          <Icon src={PostOutline} className="icon-size mr-2" />
          {threadCounts?.discussion || 0}
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        overlay={(
          <Tooltip>
            <div className="d-flex flex-column align-items-start">
              {intl.formatMessage(messages.questions, {
                count: threadCounts?.question || 0,
              })}
            </div>
          </Tooltip>
        )}
      >
        <div className="d-flex align-items-center mr-3.5">
          <Icon src={HelpOutline} className="icon-size mr-2" />
          {threadCounts?.question || 0}
        </div>
      </OverlayTrigger>
      {Boolean(canSeeReportedStats) && (
        <OverlayTrigger
          overlay={(
            <Tooltip>
              <div className="d-flex flex-column align-items-start">
                {Boolean(activeFlags) && (
                  <span>
                    {intl.formatMessage(messages.reported, { reported: activeFlags })}
                  </span>
                )}
                {Boolean(inactiveFlags) && (
                  <span>
                    {intl.formatMessage(messages.previouslyReported, { previouslyReported: inactiveFlags })}
                  </span>
                )}
              </div>
            </Tooltip>
          )}
        >
          <div className="d-flex align-items-center">
            <Icon src={Report} className="icon-size mr-2 text-danger" />
            {activeFlags}{Boolean(inactiveFlags) && `/${inactiveFlags}`}
          </div>
        </OverlayTrigger>
      )}
    </div>
  );
}

TopicStats.propTypes = {
  threadCounts: PropTypes.shape({
    discussions: PropTypes.number,
    questions: PropTypes.number,
  }),
  activeFlags: PropTypes.number,
  inactiveFlags: PropTypes.number,
  intl: intlShape.isRequired,
};

TopicStats.defaultProps = {
  threadCounts: {
    discussions: 0,
    questions: 0,
  },
  activeFlags: null,
  inactiveFlags: null,
};

export default injectIntl(TopicStats);
