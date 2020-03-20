import React from 'react'

import FacebookButton from './facebook'
import InstagramButton from './instagram'
import TwitterButton from './twitter'

const ButtonsMap = {
  facebook: FacebookButton,
  instagram: InstagramButton,
  twitter: TwitterButton
}

const ButtonRow = ({
  socialMedias
}) => {
  return (
    <>
      {socialMedias.map((sm, k) => {
        const SButton = ButtonsMap[sm]
        return <SButton key={k} />
    })}
    </>
  )
}

export default ButtonRow
