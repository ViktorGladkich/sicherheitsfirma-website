import { motion } from 'framer-motion';
import { UserCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'; // Иконки для аватара и цитаты

const TestimonialCard = ({ name, role, text, avatar }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-xl h-full flex flex-col"> {/* h-full для одинаковой высоты в карусели */}
      <div className="flex-grow mb-6">
        <ChatBubbleLeftRightIcon className="h-10 w-10 text-brand-teal mb-4 opacity-80" />
        <p className="text-brand-darkGray italic leading-relaxed">"{text}"</p>
      </div>
      <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
        {avatar ? (
          <img src={avatar} alt={name} className="h-12 w-12 rounded-full mr-4 object-cover" />
        ) : (
          <UserCircleIcon className="h-12 w-12 text-gray-300 mr-4" />
        )}
        <div>
          <p className="font-semibold text-brand-blue">{name}</p>
          {role && <p className="text-sm text-brand-gray">{role}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;