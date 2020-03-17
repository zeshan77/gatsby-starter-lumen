// @flow strict
import React from 'react';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();
  const authorHasTwitter = author.contacts.twitter !== '';

  return (
    <div className={styles['author']}>
      <p className={styles['author__bio']}>
        {author.bio}
        { authorHasTwitter
          ? <a
            className={styles['author__bio-twitter']}
            href={getContactHref('twitter', author.contacts.twitter)}
            rel="noopener noreferrer"
            target="_blank"
          >
            <strong>{author.name}</strong> on Twitter
          </a>
          : <div><strong>{author.name}</strong></div>
        }
      </p>
    </div>
  );
};

export default Author;
