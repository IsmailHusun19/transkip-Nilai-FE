import React from 'react';
import {
	FaHome,
	FaUserFriends,
	FaCalendarAlt,
	FaGraduationCap,
	FaClipboardList,
	FaUniversity,
} from 'react-icons/fa';
import { FaBookOpenReader } from "react-icons/fa6";
;
export const links = [
	{
		id: 1,
		url: '/admin',
		text: 'home',
		icon: <FaHome className="w-5 h-5" />,
	},
	{
		id: 2,
		url: '/admin/peserta',
		text: 'Peserta',
		icon: <FaUserFriends className="w-5 h-5" />,
	},
	{
		id: 3,
		url: '/admin/instruktur',
		text: 'Instruktur',
		icon: <FaGraduationCap className="w-5 h-5" />,
	},
	{
		id: 4,
		url: '/admin/periode',
		text: 'Periode',
		icon: <FaCalendarAlt className="w-5 h-5" />,
	},
	{
		id: 5,
		url: '/admin/jurusan',
		text: 'Jurusan',
		icon: <FaUniversity className="w-5 h-5" />,
	},
	{
		id: 6,
		url: '/admin/penilaian',
		text: 'Penilaian',
		icon: <FaClipboardList className="w-5 h-5" />,
	},
	{
		id: 7,
		url: '/admin/pelatihan',
		text: 'Pelatihan',
		icon: <FaBookOpenReader  className="w-5 h-5" />,
	},
];
