import { getDatabase, ref, get, query, orderByChild, limitToLast, endBefore } from 'firebase/database';

const db = getDatabase();

const limit = 15;

export const getUsersInfo = async () => {
  try {
    let userInfo;
    await get(ref(db, `userList`)).then((snapshot) => {
      if (snapshot.exists()) {
        userInfo = snapshot.val();
      } else {
        console.log('No userList data.');
      }
    });

    return userInfo;
  } catch (e) {
    console.log(e);
  }
};

export const getFirstBatch = async (sortBy, searchUid) => {
  try {
    const posts = [];
    let lastKey = '';
    let lastSortedValue = '';
    await get(
      query(
        ref(db, `reviews${searchUid ? '/user/' + searchUid : ''}/public`),
        orderByChild(sortBy),
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

        lastKey = posts[posts.length - 1].key;
        lastSortedValue = posts[posts.length - 1][sortBy];
      }
    });

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
    await get(
      query(
        ref(db, `reviews${searchUid ? '/user/' + searchUid : ''}/public`),
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

    return { posts, nextLastKey, nextLastSortedValue };
  } catch (e) {
    console.log(e);
  }
};

export const separatePostsByColumn = (posts) => {
  const fstColumnPost = [];
  const sndColumnPost = [];
  const trdColumnPost = [];

  posts.forEach((post, idx) => {
    post.num = idx;
    if (idx === 0 || idx % 3 === 0) {
      fstColumnPost.push(post);
    } else if (idx % 3 === 1) {
      sndColumnPost.push(post);
    } else if (idx % 3 === 2) {
      trdColumnPost.push(post);
    }
  });

  return [fstColumnPost, sndColumnPost, trdColumnPost];
};
