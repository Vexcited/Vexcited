# Nokotan's Acarde

```rust
use std::io::{self, BufRead};

struct SegTree {
    tree: Vec<i64>,
    lazy: Vec<Option<i64>>,
}

impl SegTree {
    fn new(size: usize) -> Self {
        SegTree {
            tree: vec![0i64; 4 * size + 4],
            lazy: vec![None; 4 * size + 4],
        }
    }

    fn propagate(&mut self, node: usize, start: i64, end: i64) {
        if let Some(laz) = self.lazy[node] {
            self.tree[node] = self.tree[node].max(laz);
            if start != end {
                let left = 2 * node;
                let right = 2 * node + 1;
                self.lazy[left] = Some(self.lazy[left].unwrap_or(i64::MIN).max(laz));
                self.lazy[right] = Some(self.lazy[right].unwrap_or(i64::MIN).max(laz));
            }
            self.lazy[node] = None;
        }
    }

    fn update(&mut self, node: usize, start: i64, end: i64, l: i64, r: i64, val: i64) {
        self.propagate(node, start, end);
        if start > end || start > r || end < l {
            return;
        }
        if l <= start && end <= r {
            self.tree[node] = self.tree[node].max(val);
            if start != end {
                self.lazy[2 * node] = Some(self.lazy[2 * node].unwrap_or(i64::MIN).max(val));
                self.lazy[2 * node + 1] = Some(self.lazy[2 * node + 1].unwrap_or(i64::MIN).max(val));
            }
            return;
        }
        let mid = (start + end) / 2;
        self.update(2 * node, start, mid, l, r, val);
        self.update(2 * node + 1, mid + 1, end, l, r, val);
        self.tree[node] = self.tree[2 * node].max(self.tree[2 * node + 1]);
    }

    fn query(&mut self, node: usize, start: i64, end: i64, l: i64, r: i64) -> i64 {
        self.propagate(node, start, end);
        if start > end || start > r || end < l {
            return i64::MIN;
        }
        if l <= start && end <= r {
            return self.tree[node];
        }
        let mid = (start + end) / 2;
        let p1 = self.query(2 * node, start, mid, l, r);
        let p2 = self.query(2 * node + 1, mid + 1, end, l, r);
        p1.max(p2)
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lines();

    let line1 = lines.next().unwrap().unwrap();
    let mut words = line1.split_whitespace();
    let n: i64 = words.next().unwrap().parse().unwrap();
    let m: i64 = words.next().unwrap().parse().unwrap();
    let t: i64 = words.next().unwrap().parse().unwrap();

    let mut players: Vec<(i64, i64, i64)> = Vec::with_capacity(m as usize);
    for _ in 0..m {
        let line = lines.next().unwrap().unwrap();
        let mut words = line.split_whitespace();
        let l: i64 = words.next().unwrap().parse().unwrap();
        let r: i64 = words.next().unwrap().parse().unwrap();
        let p: i64 = words.next().unwrap().parse().unwrap();
        players.push((l, r, p));
    }

    let mut seg = SegTree::new(n as usize);
    let d = t - 1;
    for (l_i, r_i, p_i) in players {
        let e_left = l_i + d;
        let e_right = r_i;
        if e_left > e_right {
            continue;
        }
        let rr = e_right.min(n);
        if e_left > rr {
            continue;
        }
        seg.update(1, 1, n, e_left, rr, p_i);
    }

    let mut dp: Vec<i64> = vec![0i64; (n as usize) + 1];
    for i in 1..=n {
        let mut curr = dp[(i - 1) as usize];
        if i >= t {
            let max_p = seg.query(1, 1, n, i, i);
            curr = curr.max(dp[(i - t) as usize] + max_p);
        }
        dp[i as usize] = curr;
    }

    println!("{}", dp[n as usize]);
}
```
