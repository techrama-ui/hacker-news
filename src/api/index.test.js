import { getComments, getStoryById, getTopStories, baseUrl } from './index';
describe('API Testing', () => {
    const mockResponse = {
        topStories: [ 27226382, 27220657, 27227751, 27224094, 27226625, 27227683, 27222457, 27206055, 27223340, 27227180 ],
        storyById: {
            by: "tosh",
            descendants: 276,
            id: 27220657,
            kids: [
                27226461,
                27225951,
            ],
            score: 491,
            time: 1621516369,
            title: "Before the iPhone, I worked on a few games for what were called \"feature phones\"",
            type: "story",
            url: "https://twitter.com/id_aa_carmack/status/1395089205986988043",
        },
        comments: [
            {
                by: "rmason",
                descendants: 6,
                id: 27227751,
                kids: [
                27228727,
                27228364,
                27228377,
                27228448,
                27228451,
                27228341,
                ],
                score: 37,
                time: 1621547058,
                title: "Microsoft releases SimuLand, a lab environment to simulate attacker tradecraft",
                type: "story",
                url: "https://therecord.media/microsoft-releases-simuland-a-lab-environment-to-simulate-attacker-tradecraft/",
            },
            {
                by: "tosh",
                descendants: 276,
                id: 27220657,
                kids: [
                    27226461,
                    27225951,
                ],
                score: 491,
                time: 1621516369,
                title: "Before the iPhone, I worked on a few games for what were called \"feature phones\"",
                type: "story",
                url: "https://twitter.com/id_aa_carmack/status/1395089205986988043",
            }
        ]
    };
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('getTopStories', () => {
        it('200 success', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue(
                {
                  ok: true,
                  json: () => mockResponse.topStories
                }
            );
            const response = await getTopStories(20);
            expect(response).toBeDefined();
            expect(response.topStories).toEqual(mockResponse.topStories);
            expect(global.fetch).toBeCalledWith(`${baseUrl}/topstories.json?print=pretty&orderBy="$key"&limitToFirst=20`);
        });
        it('200 success with default value', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue(
                {
                  ok: true,
                  json: () => mockResponse.topStories
                }
            );
            const response = await getTopStories();
            expect(response).toBeDefined();
            expect(response.topStories).toEqual(mockResponse.topStories);
            expect(global.fetch).toBeCalledWith(`${baseUrl}/topstories.json?print=pretty&orderBy="$key"&limitToFirst=10`);
        });
        it('500 error', async () => {
            jest.spyOn(global, 'fetch').mockRejectedValue(
                {
                  ok: false,
                  status: 500
                }
            );
            const response = await getTopStories();
            expect(response).toBeUndefined();
            expect(global.fetch).toBeCalledWith(`${baseUrl}/topstories.json?print=pretty&orderBy="$key"&limitToFirst=10`);
        });
    });
    describe('getStoryById', () => {
        it('200 success', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue(
                {
                  ok: true,
                  json: () => mockResponse.storyById,
                }
            );
            const response = await getStoryById(27220657);
            expect(response).toBeDefined();
            expect(response.story).toEqual(mockResponse.storyById);
            expect(global.fetch).toBeCalledWith(`${baseUrl}/item/27220657.json?print=pretty`);
        });
        it('500 error', async () => {
            jest.spyOn(global, 'fetch').mockRejectedValue(
                {
                  ok: false,
                  status: 500
                }
            );
            const response = await getStoryById(27220657);
            expect(response).toBeUndefined();
            expect(global.fetch).toBeCalledWith(`${baseUrl}/item/27220657.json?print=pretty`);
        });
    });
    describe('getComments', () => {
        const commentIds = [27227751, 27220657];
        it('200 success', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue(
                {
                  ok: true,
                  json: () => mockResponse.comments
                }
            );
            const response = await getComments(commentIds, 2);
            expect(response).toBeDefined();
            expect(global.fetch).toBeCalledTimes(2);
            expect(global.fetch).toHaveBeenNthCalledWith(1, `${baseUrl}/item/27227751.json?print=pretty`);
            expect(global.fetch).toHaveBeenNthCalledWith(2, `${baseUrl}/item/27220657.json?print=pretty`);
        });
        it('200 success with default value', async () => {
            jest.spyOn(global, 'fetch').mockResolvedValue(
                {
                  ok: true,
                  json: () => mockResponse.comments
                }
            );
            const response = await getComments(commentIds);
            expect(response).toBeDefined();
            expect(global.fetch).toBeCalledTimes(2);
            expect(global.fetch).toHaveBeenNthCalledWith(1, `${baseUrl}/item/27227751.json?print=pretty`);
            expect(global.fetch).toHaveBeenNthCalledWith(2, `${baseUrl}/item/27220657.json?print=pretty`);
        });
        it('500 error', async () => {
            jest.spyOn(global, 'fetch').mockRejectedValue(
                {
                  ok: false,
                  status: 500
                }
            );
            const response = await getComments(commentIds);
            expect(response).toBeUndefined();
            expect(global.fetch).toBeCalledTimes(2);
            expect(global.fetch).toHaveBeenNthCalledWith(1, `${baseUrl}/item/27227751.json?print=pretty`);
            expect(global.fetch).toHaveBeenNthCalledWith(2, `${baseUrl}/item/27220657.json?print=pretty`);
        });
    });
});