import { getDatabase, ref, get, query, orderByChild, limitToLast, endBefore } from 'firebase/database';

const db = getDatabase();

export const getFirstBatch = async (sortBy) => {
  try {
    const posts = [];
    let lastKey = '';
    let lastSortedValue = '';
    await get(query(ref(db, `reviews/public`), orderByChild(sortBy), limitToLast(4))).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        snapshot.forEach((child, idx) => {
          posts.unshift({
            key: child.key,
            ...child.val(),
          });
        });

        lastKey = posts[posts.length - 1].key;
        lastSortedValue = posts[posts.length - 1][sortBy];
      }
    });

    return { posts, lastKey, lastSortedValue };
  } catch (e) {
    console.log(e);
  }
};

export const getNextBatch = async (sortBy, lastSortedValue, lastKey) => {
  try {
    const posts = [];
    let nextLastKey = '';
    let nextLastSortedValue = '';
    await get(
      query(ref(db, `reviews/public`), orderByChild(sortBy), endBefore(lastSortedValue, lastKey), limitToLast(4)),
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

    return { posts, nextLastKey, nextLastSortedValue };
  } catch (e) {
    console.log(e);
  }
};
