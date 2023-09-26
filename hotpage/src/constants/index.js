import { FaMoneyBill, FaHandshake, FaChartBar, FaPiggyBank, FaCreditCard, FaShieldAlt, FaMobileAlt, FaMoneyCheckAlt, FaHandHoldingUsd, FaShoppingBag, FaFileInvoiceDollar, FaCreditCard as FaCreditCardAlt, FaIdCard, FaWallet } from 'react-icons/fa';

export const navLinks = [
	{ href: "/", key: "Home", text: "Home" },
	{ href: "/", key: "Products and Services", text: "Products and Services" },
	{ href: "/", key: "About Us", text: "About Us" },
];

export const footerLinks = [
	{
		title: "Pandora Bank",
		links: ["About Us", "Careers", "Contact Us", "News", "Security"],
	},
	{
		title: "Products and Services",
		links: [
			"Checking and Savings",
			"Loans and Mortgages",
			"Investments",
			"Credit Cards",
			"Online Banking",
		],
	},
	{
		title: "Customer Support",
		links: ["FAQ", "Customer Service", "Branch Locator", "ATMs"],
	},
	{
		title: "Legal",
		links: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
	},
	{
		title: "Connect with Us",
		links: ["Facebook", "Twitter", "LinkedIn", "Instagram"],
	},
];

export const underFooter = [
	{
		links: [
			"Explore our Job Openings",
			"Dollar Exchange Rate",
			"Fees",
			"Security",
			"Data Privacy",
			"Privacy Policy",
			"Ethics Channel",
			"Information Security Policy",
			"Information Security Policy for Suppliers",
		],
		copyright: "© 2023 Pandora Bank S.A. EIN: 00.666.777/0001-01",
		address: "Gaza Strip | Israel - Jah. Pod, 41 - Mossarr. Zip: P860",
	},
];

const swiperItems = [
	{
			title: "Loan",
			content: "Transparent, secure, and tailored to you. Loan options that keep you in control from start to finish.",
			icon: <FaMoneyBill />,
	},
	{
			title: "Consigned",
			content: "The consigned loan for federal public servants and soon for retirees and pensioners of INSS.",
			icon: <FaHandshake />,
	},
	{
			title: "Investments",
			content: "Investments starting from R$ 1 and options for all profiles. An easy, secure, and transparent experience.",
			icon: <FaChartBar />,
	},
	{
			title: "Cash Pots",
			content: "Organize and save money for your plans. Create customized cash pots for each of your goals.",
			icon: <FaPiggyBank />,
	},
	{
			title: "Credit Card",
			content: "A complete, modern, and free card for you. And with no annual fee. Stay in control of your financial life.",
			icon: <FaCreditCard />,
	},
	{
			title: "Life Insurance",
			content: "Protect yourself and your loved ones from R$4 per month. Choose the plan that fits your profile.",
			icon: <FaShieldAlt />,
	},
	{
			title: "Mobile Insurance",
			content: "The most comprehensive market protection, whether for theft or robbery of your phone, broken or damaged screen.",
			icon: <FaMobileAlt />,
	},
	{
			title: "Account",
			content: "Receive, move, and save your money in a simple way with a higher yield than savings.",
			icon: <FaMoneyCheckAlt />,
	},
	{
			title: "Payment Assistant",
			content: "Your personal assistant when it comes to paying the bills of the month, from the water bill to Pix for your English teacher.",
			icon: <FaHandHoldingUsd />,
	},
	{
			title: "Shopping",
			content: "A shopping mall that offers everything you need: over 150 partner stores, security, and great prices.",
			icon: <FaShoppingBag />,
	},
	{
			title: "Credit Card Payment Slip",
			content: "Pay or split your payment slips up to 12 times with your credit card and have more control over your money.",
			icon: <FaFileInvoiceDollar />,
	},
	{
			title: "Purchase Installments",
			content: "Split your in-store and online purchases directly in the Pandora app.",
			icon: <FaCreditCardAlt />,
	},
	{
			title: "Virtual Card",
			content: "Create new virtual credit or debit cards in your app and further protect your online purchases.",
			icon: <FaCreditCardAlt />,
	},
	{
			title: "Additional Card",
			content: "An additional physical credit card to be shared with another person using the same limit.",
			icon: <FaIdCard />,
	},
	{
			title: "Digital Wallet",
			content: "Store your credit card data in digital wallets like Google Pay, Apple Pay, and Samsung Pay.",
			icon: <FaWallet />,
	},
	{
			title: "Pix on Credit",
			content: "Make a Pix payment with your credit card: don't use your account balance and concentrate your expenses on the card.",
			icon: <FaCreditCardAlt />,
	},
];

export default swiperItems;
