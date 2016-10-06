import {Blog}           from './Blog';
import {BlogAccount}    from './BlogAccount'

export interface IBlogDetector {
    Detect(account: BlogAccount): Promise<Blog>;
}