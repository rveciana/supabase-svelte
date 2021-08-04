var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/rveciana/supabase-svelte.git', // Update to point to your repository  
        user: {
            name: 'rveciana', // update to use your name
            email: 'rveciana@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)