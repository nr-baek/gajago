import { getDatabase, ref, get, query, orderByChild, limitToLast, endBefore } from 'firebase/database';

const db = getDatabase();

const limit = 15;

export const getFirstBatch = async (sortBy, searchUid) => {
  try {
    const posts = [];
    let lastKey = '';
    let lastSortedValue = '';
    if (searchUid) {
      await get(query(ref(db, `reviews/user/${searchUid}/public`), orderByChild(sortBy), limitToLast(limit))).then(
        (snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((child) => {
              posts.unshift({
                key: child.key,
                ...child.val(),
              });
            });

            lastKey = posts[posts.length - 1].key;
            lastSortedValue = posts[posts.length - 1][sortBy];
          }
        },
      );
    } else {
      await get(query(ref(db, `reviews/public`), orderByChild(sortBy), limitToLast(limit))).then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            posts.unshift({
              key: child.key,
              ...child.val(),
            });
          });

          lastKey = posts[posts.length - 1].key;
          lastSortedValue = posts[posts.length - 1][sortBy];
        }
      });
    }

    return { posts, lastKey, lastSortedValue };
  } catch (e) {
    console.log(e);
  }
};

export const getNextBatch = async (sortBy, searchUid, lastSortedValue, lastKey) => {
  try {
    const posts = [];
    let nextLastKey = '';
    let nextLastSortedValue = '';
    if (searchUid) {
      await get(
        query(
          ref(db, `reviews/user/${searchUid}/public`),
          orderByChild(sortBy),
          endBefore(lastSortedValue, lastKey),
          limitToLast(limit),
        ),
      ).then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            posts.unshift({
              key: child.key,
              ...child.val(),
            });
          });

          nextLastKey = posts[posts.length - 1].key;
          nextLastSortedValue = posts[posts.length - 1][sortBy];
        }
      });
    } else {
      await get(
        query(ref(db, `reviews/public`), orderByChild(sortBy), endBefore(lastSortedValue, lastKey), limitToLast(limit)),
      ).then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            posts.unshift({
              key: child.key,
              ...child.val(),
            });
          });

          nextLastKey = posts[posts.length - 1].key;
          nextLastSortedValue = posts[posts.length - 1][sortBy];
        }
      });
    }

    return { posts, nextLastKey, nextLastSortedValue };
  } catch (e) {
    console.log(e);
  }
};
