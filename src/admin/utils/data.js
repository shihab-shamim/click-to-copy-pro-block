import { gridIcon } from '../../utils/icons';

const slug = 'click-to-copy';

export const dashboardInfo = (info) => {
	const { version, isPremium, hasPro, licenseActiveNonce, nonce, action, adminNonce, adminUrl, deleteDataOnUninstall, uninstallNonce } = info;

	const proSuffix = isPremium ? ' Pro' : '';

	return {
    name: `Click To Copy  ${proSuffix}`,
    displayName: `Click To Copy  ${proSuffix} Copy Text or Code to Clipboard Instantly`,
    description:
      "The Click To Copy Block plugin allows users to easily copy text or code snippets with a single click, enhancing engagement and simplifying content sharing on your WordPress site .",
    slug,
    version,
    isPremium,
    hasPro,
    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: `https://ps.w.org/click-to-copy/assets/icon-128x128.png?rev=3204612`,
    //   proThumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/parallax-section.png`,
      // video: "https://www.youtube.com/watch?v=milYZrqLJsE",
      // isYoutube: false,
    },
    pages: {
      org: `https://wordpress.org/plugins/${slug}/`,
      // landing: `https://bplugins.com/products/${slug}/`,
      docs: `https://bplugins.com/docs/${slug}/`,
      pricing: `https://bplugins.com/products/${slug}/pricing`,
    },
    freemius: {
      product_id: 20412,
      plan_id: 33923,
      public_key: "pk_7123d338dc6b76530002aaf635166",
    },
    licenseActiveNonce,
    nonce,
    action,
    adminNonce,
    adminUrl,
    deleteDataOnUninstall,
    uninstallNonce,
    startButton: {
      label: "Start Now",
      url: `wp-admin/post-new.php?post_type=page&title=Click To Copy &content=<!-- wp:ctcb/click-to-copy {"cId":"34f719d5-7"} /-->&nonce=${nonce}`,
    },
  };
}

export const welcomeInfo = (adminUrl = "") => ({
	// Hero card keyword chips
	keywords: ["One-Click Copy", "Shortcode", "15+ Themes"],
	keywordsLabel: "Features",

	// Getting Started tabbed steps
	gettingStarted: {
		tabs: [
			{
				key: "gutenberg",
				label: "Gutenberg",
				steps: [
					{
						num: 1,
						title: "Add the Block",
						body: "Open the block editor. Click <strong>+</strong> or type <strong>/Click To Copy</strong>.",
						link: { url: `${adminUrl}post-new.php`, label: "Open Editor" },
					},
					{
						num: 2,
						title: "Pick a Theme",
						body: "Choose a default style or one of the <strong>15+ ready-made themes</strong>.",
					},
					{
						num: 3,
						title: "Add Your Content",
						body: "Enter the text or code snippet you want visitors to copy with one click.",
					},
					{
						num: 4,
						title: "Style & Publish",
						body: "Adjust the copy icon, label, colors, spacing, and hover effects, then publish.",
					},
				],
			},
			{
				key: "shortcode",
				label: "Shortcode",
				steps: [
					{
						num: 1,
						title: "Create a ShortCode",
						body: "Go to <strong>Click To Copy</strong> in your admin menu and click <strong>Add New</strong>.",
						link: { url: `${adminUrl}post-new.php?post_type=ctc`, label: "Add New" },
					},
					{
						num: 2,
						title: "Build & Publish",
						body: "Add your content, configure the block, and <strong>Publish</strong> the post.",
					},
					{
						num: 3,
						title: "Copy the Shortcode",
						body: "Go to <strong>Click To Copy -> ShortCodes</strong> to find and copy the shortcode (e.g. <code>[ctc id=\"123\"]</code>).",
						link: { url: `${adminUrl}edit.php?post_type=ctc`, label: "All ShortCodes" },
					},
					{
						num: 4,
						title: "Paste & Display",
						body: "Paste the shortcode into any post, page, widget, or page builder layout.",
					},
				],
			},
			{
				key: "elementor",
				label: "Elementor",
				steps: [
					{
						num: 1,
						title: "Create a ShortCode",
						body: "Go to <strong>Click To Copy -> Add New</strong> to build and publish a snippet, then copy its shortcode.",
						link: { url: `${adminUrl}post-new.php?post_type=ctc`, label: "Add New" },
					},
					{
						num: 2,
						title: "Edit with Elementor",
						body: "Open any post or page in the <strong>Elementor</strong> editor.",
					},
					{
						num: 3,
						title: "Add Shortcode Widget",
						body: "Search for the <strong>Shortcode</strong> widget in the Elementor elements panel and drag it into your layout.",
					},
					{
						num: 4,
						title: "Paste Shortcode",
						body: "Paste your shortcode (e.g., <code>[ctc id=\"123\"]</code>) into the widget input field and save your changes.",
					},
				],
			},
			{
				key: "php",
				label: "PHP",
				steps: [
					{
						num: 1,
						title: "Get the ID",
						body: "Go to <strong>Click To Copy -> ShortCodes</strong> and note the <strong>ID</strong> of the snippet you want to embed.",
						link: { url: `${adminUrl}edit.php?post_type=ctc`, label: "All ShortCodes" },
					},
					{
						num: 2,
						title: "Copy PHP Function",
						body: "Copy the WordPress <code>do_shortcode</code> function: <pre><code>&lt;?php echo do_shortcode('[ctc id=\"YOUR_ID\"]'); ?&gt;</code></pre>",
					},
					{
						num: 3,
						title: "Insert in Template",
						body: "Open your theme or template files (e.g., <code>single.php</code>, <code>page.php</code>) in an editor.",
					},
					{
						num: 4,
						title: "Replace ID & Save",
						body: "Paste the code into your PHP file and replace <code>YOUR_ID</code> with the actual ID of your snippet.",
					},
				],
			},
		],
	},

	// Changelogs — each list item starts with <strong>Type:</strong> for badges
	changelogs: [
				{
		version: "2.0.3 - 8 July, 2026",
		type: "update",
		list: [
			"<strong>Update:</strong> Added compatibility with WordPress 7.0",
			"<strong>Update:</strong> Minor UI improvements",
		],
	},
		{
			version: "2.0.2- 22 June, 2026",
			type: "update",
			list: [
				"<strong>Update:</strong> Added a modern and intuitive dashboard layout.",
			],
		},
		{
			version: "2.0.1 - 29 Sep, 2025",
			type: "New",
			list: [
				"<strong>New:</strong> Added 15+ stylish themes.",
			],
		},
	],
	changelogsLimit: 6,
	changelogsReadMoreLabel: "View More Changelogs",

	// Pro upsell bullets (free users only)
	proFeatures: [
		"Universal Shortcodes – Works with all page builders",
		"15+ Ready-to-Use Themes",
		"Customizable Copy Icon",
		"Icon Size Control",
		"Custom Label & Typography",
		"Background Customization",
		"Padding & Spacing Options",
		"Border & Radius Control",
		"Box Shadow & Hover Shadow",
		"Responsive Design",
		"One-Click Copy Functionality",
	],
});

export const demoInfo = {
	// allInOneLabel: 'See All Demos',
	// allInOneLink: 'https://apb.bplugins.com/all-demos-in-one-place/',
	demos: [
		{
			icon: gridIcon,
			title: 'Default',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/click-to-copy-default/',
		},
		{
			icon: gridIcon,
			title: 'Theme-1',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/click-to-copy-form-1/',
		},
		{
			icon: gridIcon,
			title: 'Theme-2',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/click-to-copy-form-2/',
		},
		{
			icon: gridIcon,
			title: 'Theme-3',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/click-to-copy-form-3/',
		},
		{
			icon: gridIcon,
			title: 'Theme-4',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-4/',
		},
		{
			icon: gridIcon,
			title: 'Theme-5',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-5/',
		},
		{
			icon: gridIcon,
			title: 'Theme-6',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-6/',
		},
		{
			icon: gridIcon,
			title: 'Theme-7',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-7/',
		},
		{
			icon: gridIcon,
			title: 'Theme-8',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-8/',
		},
		{
			icon: gridIcon,
			title: 'Theme-9',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-9/',
		},
		{
			icon: gridIcon,
			title: 'Theme-10',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-10/',
		},
		{
			icon: gridIcon,
			title: 'Theme-11',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-11/',
		},
		{
			icon: gridIcon,
			title: 'Theme-12',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-12/',
		},
		{
			icon: gridIcon,
			title: 'Theme-13',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-13/',
		},
		{
			icon: gridIcon,
			title: 'Theme-14',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-14/',
		},
		{
			icon: gridIcon,
			title: 'Theme-15',
			type: 'iframe',
					url: 'https://bblockswp.com/demo/form-15/',
		},
		]


}

export const pricingInfo = {
  logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`, // Optional
  pluginId: 20412,
  planId: 33923,
  licenses: [1, 3, null],
  button: {
    label: "Buy Now ➜",
  },
  featured: {
    selected: 3, // choose from licenses item
  },
};
