<?php

namespace Feston\AperitifBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class User
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="string")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime")
     */
    private $created;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="Feston\AperitifBundle\Entity\Aperitif", inversedBy="attendees")
     * @ORM\JoinColumn(nullable=true)
     */
    private $aperitif;

    public function __construct($name)
    {
        $this->created = new \DateTime();
        $this->name = $name;
    }

    /**
     * Get id
     *
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return User
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set aperitif
     *
     * @param \Feston\AperitifBundle\Entity\Aperitif $aperitif
     * @return User
     */
    public function setAperitif(\Feston\AperitifBundle\Entity\Aperitif $aperitif = null)
    {
        $this->aperitif = $aperitif;

        return $this;
    }

    /**
     * Get aperitif
     *
     * @return \Feston\AperitifBundle\Entity\Aperitif
     */
    public function getAperitif()
    {
        return $this->aperitif;
    }
}
