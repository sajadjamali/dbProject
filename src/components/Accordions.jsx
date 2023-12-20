import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Accordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='mt-5 md:w-6/12 m-auto'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            درباره ی ما
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>ما کتابخانه ی مرکزی هستیم</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            تنوع کتاب ها
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>مدیریت</Typography>
          <Typography sx={{ color: 'text.primary' }}>
            جناب خانم احمدی...
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            واحد تحصیلاتی...
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            تاسیس
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>
            در سال 1380...
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            در سال ...
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>اعضا</Typography>
          <Typography sx={{ color: 'text.primary' }}>
            ارائه ی خدمات متنوع
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            بیش از 1000 نفر...
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
