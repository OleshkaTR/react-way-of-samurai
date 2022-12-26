import {create} from 'react-test-renderer';
import Pagination from './Pagination';

describe("Paginator component tests", () => {
    test("pages count is 11 but should be showed only 10", () => {
        const component = create(<Pagination totalCount={11} pageSize={1} currentPage={1} />);
        const root = component.root;
        let spans = root.findAllByType('span');
        expect(spans.length).toBe(10);
    });

    test("if page count is more then 10 button next should be present", () => {
        const component = create(<Pagination totalCount={11} pageSize={1} currentPage={1} />);
        const root = component.root;
        let button = root.findAllByType('button');
        expect(button.length).toBe(1);
    });
})
