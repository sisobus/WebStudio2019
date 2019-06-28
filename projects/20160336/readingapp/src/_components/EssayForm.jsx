import React from 'react';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import './EssayForm.css'
class EssayForm extends React.Component {
  state = {};

  render() {

    return (
    <div id="commentary">
      <Comment
        content={
          <p>The look Crowley gives Aziraphale when he finds out he gave away his sword.
          The way Crowley seeks out Azirpahale before they are officially even friends.
          The fact that Azirpahale already recognized Crowley’s voice in Rome.
          Azirpahale getting into dangerous situations that he could easily get out of, but not doing it because he knows Crowley will always come, and he wants to see him.
          Crowley ALWAYS comes. He is clearly watching over Azirpahale and knows every time he is in danger and he never lets him down.
          Crowley creates an elaborate plan to steal holy water in the same city Azirpahale lives in because he knows Azirpahale will hear about it and come to him.</p>
        }
        datetime={
          <p>
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
          </p>
        }
      />
    <Comment
        content={
          <p>The look Crowley gives Aziraphale when he finds out he gave away his sword.
          The way Crowley seeks out Azirpahale before they are officially even friends.
          The fact that Azirpahale already recognized Crowley’s voice in Rome.
          Azirpahale getting into dangerous situations that he could easily get out of, but not doing it because he knows Crowley will always come, and he wants to see him.
          Crowley ALWAYS comes. He is clearly watching over Azirpahale and knows every time he is in danger and he never lets him down.
          Crowley creates an elaborate plan to steal holy water in the same city Azirpahale lives in because he knows Azirpahale will hear about it and come to him.</p>
        }
        datetime={
          <p>
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
          </p>
        }
    />
    <Comment
        content={
          <p>The look Crowley gives Aziraphale when he finds out he gave away his sword.
          The way Crowley seeks out Azirpahale before they are officially even friends.
          The fact that Azirpahale already recognized Crowley’s voice in Rome.
          Azirpahale getting into dangerous situations that he could easily get out of, but not doing it because he knows Crowley will always come, and he wants to see him.
          Crowley ALWAYS comes. He is clearly watching over Azirpahale and knows every time he is in danger and he never lets him down.
          Crowley creates an elaborate plan to steal holy water in the same city Azirpahale lives in because he knows Azirpahale will hear about it and come to him.</p>
        }
        datetime={
          <p>
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
          </p>
        }
    />
    </div>
    );
  }
}

export default EssayForm;