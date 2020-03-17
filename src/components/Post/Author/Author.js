// @flow strict
import React from 'react';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();
  const authorHasTwitter = author.contacts.twitter !== '';

  let authorSignature;
  if (authorHasTwitter) {
    authorSignature = (
      <a
        className={styles['author__bio-twitter']}
        href={getContactHref('twitter', author.contacts.twitter)}
        rel="noopener noreferrer"
        target="_blank">
        <strong>{author.name}</strong> on Twitter
      </a>
    );
  } else {
    authorSignature = (
      <div>
        <strong>{author.name}</strong>
      </div>
    );
  }

  return (
    <div className={styles['author']}>
      <p className={styles['author__bio']}>
        {author.bio}
        {authorSignature}
      </p>
    </div>
  );
};

export default Author;
